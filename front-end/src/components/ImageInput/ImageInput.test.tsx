import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageInput, getFileImage, getFile } from './ImageInput';
import * as Yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

describe('ImageInput component', () => {
  it('should when user selects a file in input update the value in the form', async () => {
    expect.assertions(1);

    const onSubmit = jest.fn();

    function Wrapper() {
      const form = useForm({
        defaultValues: {
          front: ''
        }
      });

      return (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit((form) => onSubmit(form))}>
            <ImageInput name="front" label="Front" />

            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    }

    render(<Wrapper />);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    await userEvent.upload(screen.getByLabelText('Front'), file);

    await screen.findByAltText('Front');

    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      front: file
    });
  });

  it('should render error when error is defined', async () => {
    expect.assertions(2);

    const onSubmit = jest.fn();

    function Wrapper() {
      const form = useForm({
        defaultValues: {
          front: ''
        },
        resolver: yupResolver(
          Yup.object({
            front: Yup.mixed().test(
              'file',
              'front is a required field',
              (value) => value
            )
          })
        )
      });

      return (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit((form) => onSubmit(form))}>
            <ImageInput name="front" label="Front" />

            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    }

    render(<Wrapper />);

    await userEvent.click(screen.getByText('Submit'));

    const error = await screen.findByText('front is a required field');
    expect(error).toBeInTheDocument();

    expect(onSubmit).toBeCalledTimes(0);
  });

  it('should whenever a file is selected and the trash icon is clicked, removed the selected file', async () => {
    expect.assertions(2);

    const onSubmit = jest.fn();

    function Wrapper() {
      const form = useForm({
        defaultValues: {
          front: ''
        },
        resolver: yupResolver(
          Yup.object({
            front: Yup.mixed().test(
              'file',
              'front is a required field',
              (value) => value
            )
          })
        )
      });

      return (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit((form) => onSubmit(form))}>
            <ImageInput name="front" label="Front" />

            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    }

    render(<Wrapper />);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    await userEvent.upload(screen.getByLabelText('Front'), file);

    const trash = await screen.findByTestId('trash');

    await userEvent.click(trash);

    expect(screen.queryByTestId('trash')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Submit'));

    await screen.findByText('front is a required field');

    expect(onSubmit).toBeCalledTimes(0);
  });

  it('should when the file which is uploaded is null ignore the file', async () => {
    expect.assertions(2);

    const onSubmit = jest.fn();

    function Wrapper() {
      const form = useForm({
        defaultValues: {
          front: ''
        }
      });

      return (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit((form) => onSubmit(form))}>
            <ImageInput name="front" label="Front" />

            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    }

    render(<Wrapper />);

    const input = screen.getByLabelText('Front');

    // Horrible hack to call onChange since userEvent.upload does
    // not let me pass in `null` whilst this can actually happen.
    for (const prop of Object.keys(input)) {
      if (prop.includes('__reactProps')) {
        await act(() => {
          // @ts-expect-error Allow me to pass in null for a test
          input[prop].onChange({ target: {} });
        });

        break;
      }
    }

    expect(screen.queryByTestId('trash')).not.toBeInTheDocument();

    expect(onSubmit).toBeCalledTimes(0);
  });

  it('should show the image when the default value is not empty', async () => {
    expect.assertions(2);

    const onSubmit = jest.fn();

    function Wrapper() {
      const form = useForm({
        defaultValues: {
          front: 'https://www.fake.com'
        },
        resolver: yupResolver(
          Yup.object({
            front: Yup.mixed().test(
              'file',
              'front is a required field',
              (value) => value
            )
          })
        )
      });

      return (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit((form) => onSubmit(form))}>
            <ImageInput name="front" label="Front" />

            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    }

    render(<Wrapper />);

    expect(screen.queryByTestId('trash')).toBeInTheDocument();

    expect(onSubmit).toBeCalledTimes(0);
  });
});

describe('getFile helper', () => {
  it('should when there are no files return null', () => {
    // @ts-expect-error Test mock
    const file = getFile({ target: { files: null } });

    expect(file).toBe(null);
  });

  it('should when there is no file return null', async () => {
    expect.assertions(2);

    // Create a fake FileList since we cannot instantiate it because
    // FileList is read-only.
    const fileList = {
      item(index: number) {
        expect(index).toBe(0);

        return null;
      }
    };

    // @ts-expect-error Test mock
    const file = await getFile({ target: { files: fileList } });

    expect(file).toBe(null);
  });

  it('should when a file exists as the first item in the FileList return that file', async () => {
    expect.assertions(2);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    // Create a fake FileList since we cannot instantiate it because
    // FileList is read-only.
    const fileList = {
      item(index: number) {
        expect(index).toBe(0);

        return file;
      }
    };

    // @ts-expect-error Test mock
    const result = await getFile({ target: { files: fileList } });

    expect(result).toBe(file);
  });
});

describe('getFileImage helper', () => {
  it('should when the image can be read by the FileReader return a the image as a data string', async () => {
    expect.assertions(1);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    const image = await getFileImage(file);

    expect(image).not.toBe('');
  });

  it('should when the image cannot be read by the FileReader, due to the result not being a string, return an empty string for the image', async () => {
    expect.assertions(1);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    jest
      .spyOn(FileReader.prototype, 'readAsDataURL')
      .mockImplementation(function () {
        // @ts-expect-error this is a FileReader here.
        this.onloadend();
      });

    const image = await getFileImage(file);

    expect(image).toBe('');
  });

  it('should when the image cannot be read by the FileReader, due to an ononerror, return an empty string for the image', async () => {
    expect.assertions(1);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    jest
      .spyOn(FileReader.prototype, 'readAsDataURL')
      .mockImplementation(function () {
        // @ts-expect-error this is a FileReader here.
        this.onerror();
      });

    const image = await getFileImage(file);

    expect(image).toBe('');
  });
});
