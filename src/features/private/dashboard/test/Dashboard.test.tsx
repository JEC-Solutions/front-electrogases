import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "@/features/private/dashboard/page";

// Mock de componentes hijos para no renderizar toda su lógica
jest.mock("@/features/private/dashboard/components", () => ({
  Sidebar: () => <div data-testid="Sidebar" />,
  Navbar: () => <div data-testid="Navbar" />,
  Historial: () => <div data-testid="Historial" />,
}));

describe("Dashboard", () => {
  beforeEach(() => {
    // Simular escritorio
    global.innerWidth = 1024;
    window.dispatchEvent(new Event("resize"));
  });

  test("renderiza correctamente en escritorio", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("Sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("Navbar")).toBeInTheDocument();
    expect(screen.getByTestId("Historial")).toBeInTheDocument();
  });
});
