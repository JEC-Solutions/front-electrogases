import { render, screen, fireEvent } from "@testing-library/react";
import { Login } from "@/features/public/login/pages";
import { useLogin } from "@/features/public/login/hooks";
import { useForm } from "react-hook-form";
import { FC } from "react";

// Mock del hook personalizado
jest.mock("@/features/public/login/hooks", () => ({
  useLogin: jest.fn(),
}));

const mockOnSubmit = jest.fn();

const TestLoginWrapper: FC = () => {
  const form = useForm();

  // Configura el mock dentro de un componente real, usando useForm correctamente
  (useLogin as jest.Mock).mockReturnValue({
    control: form.control,
    handleSubmit: (cb: any) => (e: any) => {
      e.preventDefault();
      cb();
    },
    onSubmit: mockOnSubmit,
    setShowPassword: jest.fn(),
    showPassword: false,
  });

  return <Login />;
};

describe("Login Component", () => {
  test("debería renderizar los campos de usuario y contraseña", () => {
    render(<TestLoginWrapper />);
    expect(screen.getByPlaceholderText("Usuario")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });

  test("debería llamar onSubmit al enviar el formulario", () => {
    render(<TestLoginWrapper />);
    const submitButton = screen.getByRole("button", {
      name: /iniciar sesión/i,
    });
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});