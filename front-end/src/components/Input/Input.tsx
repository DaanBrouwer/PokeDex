import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import { HTMLInputTypeAttribute } from 'react';
import {
  FieldValues,
  Path,
  UnPackAsyncDefaultValues,
  useFormContext
} from 'react-hook-form';

type Props<T extends FieldValues> = {
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
   * Optionally the type of the <input> element.
   *
   * When the type is "number" the value of the <input>
   * will be automatically transformed to a number.
   *
   * Will default to "text".
   */
  type?: HTMLInputTypeAttribute;
};

/**
 * The Input component is a "react-hook-form" aware <input> element
 * which is styled.
 *
 * It will register itself to the form for you based on the name,
 * and it will also render error messages.
 */
export function Input<T extends FieldValues>({
  name,
  label,
  type = 'text'
}: Props<T>) {
  const {
    register,
    formState: { errors }
  } = useFormContext<T>();

  return (
    <div>
      <label>
        <span
          className={classNames(
            'font-bold ',
            errors[name] ? 'text-red-500' : 'text-gray-700'
          )}
        >
          {label}
        </span>
        <input
          {...register(name, { valueAsNumber: type === 'number' })}
          className="
            mt-1 block w-full h-10 px-2
            rounded-md bg-gray-100 border-transparent
            focus:border-gray-500 focus:bg-white focus:ring-0
          "
          type={type}
          aria-invalid={errors[name] ? "true" : "false"}
        />
      </label>
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
