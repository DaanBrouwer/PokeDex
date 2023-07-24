import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import {
  FieldValues,
  Path,
  UnPackAsyncDefaultValues,
  useFormContext
} from 'react-hook-form';

type Props<T extends FieldValues> = {
  /**
   * The property inside of your form this
   * ImageInput component represents.
   */
  name: Path<UnPackAsyncDefaultValues<T>>;

  /**
   * The label of the <input> element.
   */
  label: string;
};

/**
 * The ImageInput component is a "react-hook-form" aware
 * <input type="file"> element which is styled.
 *
 * It will register itself to the form for you based on the name,
 * and it will also render error messages.
 */
export function ImageInput<T extends FieldValues>({ name, label }: Props<T>) {
  const labelRef = useRef<HTMLLabelElement | null>(null);

  const [imgUrl, setImageUrl] = useState('');

  const {
    watch,
    register,
    setValue,
    formState: { errors }
  } = useFormContext<T>();

  const value = watch(name);

  useEffect(() => {
    // For some reason we get a FileList sometimes.
    async function extractImage(file: File) {
      const image = await getFileImage(file);

      setImageUrl(image);
    }

    if (value) {
      if (typeof value === 'string') {
        setImageUrl(value);
      } else {
        extractImage(value);
      }
    }
  }, [value]);

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const file = getFile(event);

    // @ts-expect-error Set it to a File which it should accept.
    setValue(name, file, { shouldValidate: true, shouldDirty: true });
  }

  function onTrashClicked(event: MouseEvent) {
    event.preventDefault();

    setImageUrl('');

    // @ts-expect-error Setting it empty will clear the field.
    setValue(name, '', { shouldValidate: true, shouldDirty: true });
  }

  const spriteInput = register(name);

  return (
    <div>
      <label ref={labelRef}>
        <span
          className={classNames(
            'font-bold ',
            errors[name] ? 'text-red-500' : 'text-gray-700'
          )}
        >
          {label}
        </span>

        {imgUrl ? (
          <div className="flex gap-4 items-center">
            <img data-testid="image" src={imgUrl} alt={label} />
            <FontAwesomeIcon
              icon={faTrash}
              data-testid="trash"
              onClick={onTrashClicked}
              className="cursor-pointer"
              size="lg"
            />
          </div>
        ) : (
          <input
            onBlur={spriteInput.onBlur}
            onChange={handleOnChange}
            name={name}
            className={classNames(
              'mt-1 block w-full h-10 px-2',
              'rounded-md bg-gray-100 border-transparent',
              'focus:border-gray-500 focus:bg-white focus:ring-0',
              'pt-1'
            )}
            type="file"
            accept="image/png"
            aria-invalid={errors[name] ? 'true' : 'false'}
          />
        )}
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

export function getFile(event: ChangeEvent<HTMLInputElement>): File | null {
  const files = event.target.files;

  if (!files) {
    return null;
  }

  const file = files.item(0);

  if (!file) {
    return null;
  }

  return file;
}

export async function getFileImage(file: File): Promise<string> {
  return await new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result;

      if (typeof result === 'string') {
        resolve(result);
      } else {
        resolve('');
      }
    };

    reader.onerror = () => {
      resolve('');
    };

    // A File is a type of Blob
    reader.readAsDataURL(file as Blob);
  });
}
