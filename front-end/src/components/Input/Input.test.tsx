import { yupResolver } from '@hookform/resolvers/yup';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Input } from './Input';

describe('Input component', () => {
  it('should when user types in input update the value in the form', async () => {
    expect.assertions(2);

    const onSubmit = jest.fn();

    function Wrapper() {
      const form = useForm({
        defaultValues: {
          confirm: ''
        }
      });

      return (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit((form) => onSubmit(form))}>
            <Input name="confirm" label="Confirm" type="password" />

            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    }

    render(<Wrapper />);

    const input = screen.getByLabelText <HTMLInputElement>('Confirm');

    expect(input.type).toBe('password');

    await userEvent.type(input, 'thepwd');

    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      confirm: 'thepwd'
    });
  });

  it('should render error when error is defined', async () => {
    expect.assertions(2);

    const onSubmit = jest.fn();

    function Wrapper() {
      const form = useForm({
        defaultValues: {
          name: ''
        },
        resolver: yupResolver(
          Yup.object({
            name: Yup.string().required()
          })
        )
      });

      return (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit((form) => onSubmit(form))}>
            <Input name="name" label="Name" type="text" />

            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    }

    render(<Wrapper />);

    await userEvent.click(screen.getByText('Submit'));

    const name = await screen.findByText('name is a required field');
    expect(name).toBeDefined();

    expect(onSubmit).toBeCalledTimes(0);
  });

  it('should default to a "text" type input', async () => {
    expect.assertions(1);

    const onSubmit = jest.fn();

    function Wrapper() {
      const form = useForm({
        defaultValues: {
          name: ''
        }
      });

      return (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit((form) => onSubmit(form))}>
            <Input name="name" label="Name" />

            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    }

    render(<Wrapper />);

    const input = screen.getByLabelText<HTMLInputElement>('Name');

    expect(input.type).toBe('text');
  });
});
