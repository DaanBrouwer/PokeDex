import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultiCheckbox } from './MultiCheckbox';
import * as Yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type Car = {
  id: number;
  name: string;
};

describe('MultiCheckbox component', () => {
  it('should when user selects / deselects an option update the value in the form', async () => {
    expect.assertions(2);

    const onSubmit = jest.fn();

    function Wrapper() {
      const form = useForm({
        defaultValues: {
          cars: []
        }
      });

      return (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit((form) => onSubmit(form))}>
            <MultiCheckbox
              name="cars"
              label="Confirm"
              options={[
                { id: 1, name: 'Ford' },
                { id: 2, name: 'Ferrari' },
                { id: 3, name: 'Mercedes' }
              ]}
              labelForOption={(car) => car.name.toUpperCase()}
            />

            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    }

    render(<Wrapper />);

    await userEvent.click(screen.getByLabelText('FORD'));

    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      cars: [{ id: 1, name: 'Ford' }]
    });

    // Unselect Ford now and select only Mercedes
    await userEvent.click(screen.getByLabelText('FORD'));
    await userEvent.click(screen.getByLabelText('MERCEDES'));

    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      cars: [{ id: 3, name: 'Mercedes' }]
    });
  });

  it('should work when the value starts as undefined', async () => {
    expect.assertions(1);

    const onSubmit = jest.fn();

    function Wrapper() {
      const form = useForm({
        defaultValues: {
          cars: undefined
        }
      });

      return (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit((form) => onSubmit(form))}>
            <MultiCheckbox
              name="cars"
              label="Confirm"
              options={[
                { id: 1, name: 'Ford' },
                { id: 2, name: 'Ferrari' },
                { id: 3, name: 'Mercedes' }
              ]}
              labelForOption={(car) => car.name.toUpperCase()}
            />

            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    }

    render(<Wrapper />);

    await userEvent.click(screen.getByLabelText('FORD'));

    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      cars: [{ id: 1, name: 'Ford' }]
    });
  });

  it('should render error when error is defined', async () => {
    expect.assertions(2);

    const onSubmit = jest.fn();

    function Wrapper() {
      const form = useForm({
        defaultValues: {
          cars: []
        },
        resolver: yupResolver(
          Yup.object({
            cars: Yup.array(
              Yup.object({
                id: Yup.number().required()
              })
            )
              .required()
              .min(1)
              .label('Cars')
          })
        )
      });

      return (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit((form) => onSubmit(form))}>
            <MultiCheckbox
              name="cars"
              label="Confirm"
              options={[
                { id: 1, name: 'Ford' },
                { id: 2, name: 'Ferrari' },
                { id: 3, name: 'Mercedes' }
              ]}
              labelForOption={(car) => car.name.toUpperCase()}
            />

            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    }

    render(<Wrapper />);

    await userEvent.click(screen.getByText('Submit'));

    const text = await screen.findByText(
      'Cars field must have at least 1 items'
    );
    expect(text).toBeDefined();

    expect(onSubmit).toBeCalledTimes(0);
  });
});
