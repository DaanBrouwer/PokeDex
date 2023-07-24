import { ErrorMessage } from '@hookform/error-message';
import {
  FieldValues,
  Path,
  UnPackAsyncDefaultValues,
  useFormContext
} from 'react-hook-form';

type Props<T extends FieldValues, O> = {
  /**
   * The property inside of your form this
   * Input component represents.
   */
  name: Path<UnPackAsyncDefaultValues<T>>;

  /**
   * The label of the <input> element.
   */
  label: string;

  /**
   * The array of options the MultiCheckbox
   * should display for the user be able
   * to select.
   */
  options: O[];

  /**
   * A callback function which is given an option
   * and is expected to return a label (string)
   * for that option to display next to the
   * checkbox.
   *
   * @param {O} option The option to get a label for.
   */
  labelForOption(option: O): string;
};

/**
 * The MultiCheckbox component is a "react-hook-form" aware form
 * element which renders a bunch of checkboxes. The idea is that you
 * bind it to an array, so the user can select values from that array.
 *
 * This way the user can select multiple values from a predefined
 * list.
 *
 * The idea is that you provide to the <MultiCheckbox> a prop called
 * "options", these represent the selections the user can make.
 * Options should be an array of object, the objects should have an
 * "id" prop.
 *
 * The prop called "labelForOption", expects a function which
 * transforms "options" objects into strings. These strings are the
 * labels for the checkboxes next to each option.
 *
 * It will register itself to the form for you based on the name,
 * and it will also render error messages.
 */
export function MultiCheckbox<
  T extends FieldValues,
  O extends { id: number | string }
>({ name, label, options, labelForOption }: Props<T, O>) {
  const {
    watch,
    setValue,
    register,
    formState: { errors }
  } = useFormContext<T>();

  register(name);

  const value = watch(name) ?? ([] as O[]);

  function onChange(option: O, checked: boolean) {
    if (checked) {
      const newValue = value.filter((o: O) => o.id !== option.id);

      // @ts-expect-error This will work just fine
      setValue(name, newValue, { shouldValidate: true, shouldDirty: true });
    } else {
      const newValue = [...value, option];

      // @ts-expect-error This will work just fine
      setValue(name, newValue, { shouldValidate: true, shouldDirty: true });
    }
  }

  return (
    <div>
      <span className="block font-bold text-gray-700">{label}</span>

      <div className="grid grid-cols-3">
        {options.map((option) => {
          const checked = value.some((o: O) => option.id === o.id);

          return (
            <label key={option.id} className="flex items-center">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onChange(option, checked)}
              />

              <span className="ml-2">{labelForOption(option)}</span>
            </label>
          );
        })}
      </div>
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <div className="text-red-500 my-2">{message}</div>
        )}
      />
    </div>
  );
}
