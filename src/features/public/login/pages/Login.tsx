import { motion } from "framer-motion";
import { Controller } from "react-hook-form";
import { Card, Input, Button } from "antd";
import {
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLogin } from "@/features/public/login/hooks";

const Login = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    setShowPassword,
    showPassword,
    changePassword,
    handleBackToLogin,
  } = useLogin();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <motion.div
        className="flex-1 hidden lg:block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/imagenes/banner_login.jpg"
          alt="Login"
          className="object-cover w-full h-screen"
        />
      </motion.div>
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card style={{ width: "28rem", maxWidth: "28rem" }}>
            <div className="flex justify-center mb-10">
              <img
                src="/imagenes/logo.png"
                alt="Logo de la App"
                style={{ height: "60px" }}
              />
            </div>
            {!changePassword ? (
              <>
                <h2 className="text-3xl font-bold text-center">Bienvenido</h2>
                <p className="text-center mb-4">
                  Ingresa sus credenciales para continuar
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div style={{ marginBottom: "16px" }}>
                    <label>Usuario</label>
                    <Controller
                      name="username"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Por favor ingrese su usuario!" }}
                      render={({ field, fieldState }) => (
                        <>
                          <Input
                            {...field}
                            prefix={<UserOutlined />}
                            placeholder="Usuario"
                            type="text"
                            status={fieldState.invalid ? "error" : ""}
                          />
                          {fieldState.error && (
                            <span style={{ color: "red" }}>
                              {fieldState.error.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label htmlFor="password">Contraseña</label>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Por favor ingrese su contraseña!" }}
                      render={({ field, fieldState }) => (
                        <>
                          <Input.Password
                            {...field}
                            prefix={<LockOutlined />}
                            placeholder="Contraseña"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            iconRender={(visible) =>
                              visible ? (
                                <EyeTwoTone />
                              ) : (
                                <EyeInvisibleOutlined />
                              )
                            }
                            status={fieldState.invalid ? "error" : ""}
                            onClick={() => setShowPassword(!showPassword)}
                          />
                          {fieldState.error && (
                            <span style={{ color: "red" }}>
                              {fieldState.error.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <Button
                    className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Iniciar sesión
                  </Button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-center">
                  Recuperar contraseña
                </h2>
                <p className="text-center mb-4">
                  Ingresa tu identificación y correo electrónico
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div style={{ marginBottom: "16px" }}>
                    <label htmlFor="numero_documento">Identificación</label>
                    <Controller
                      name="numero_documento"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Por favor ingrese su identificacion!",
                      }}
                      render={({ field, fieldState }) => (
                        <>
                          <Input
                            {...field}
                            placeholder="Identificación"
                            type="text"
                            id="numero_documento"
                            prefix={<UserOutlined />}
                            status={fieldState.invalid ? "error" : ""}
                          />
                          {fieldState.error && (
                            <span style={{ color: "red" }}>
                              {fieldState.error.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label htmlFor="nuevaContrasena">Nueva Contraseña</label>
                    <Controller
                      name="nuevaContrasena"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Por favor ingrese su nueva contraseña!",
                      }}
                      render={({ field, fieldState }) => (
                        <>
                          <Input.Password
                            {...field}
                            id="nuevaContrasena"
                            placeholder="Contraseña"
                            prefix={<LockOutlined />}
                            iconRender={(visible) =>
                              visible ? (
                                <EyeTwoTone />
                              ) : (
                                <EyeInvisibleOutlined />
                              )
                            }
                            visibilityToggle={{
                              visible: showPassword,
                              onVisibleChange: setShowPassword,
                            }}
                            status={fieldState.invalid ? "error" : ""}
                          />
                          {fieldState.error && (
                            <span style={{ color: "red" }}>
                              {fieldState.error.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div className="flex justify-end mb-4">
                    <button
                      type="button"
                      onClick={handleBackToLogin}
                      className="text-sm text-primary hover:underline"
                    >
                      Volver al inicio de sesión
                    </button>
                  </div>
                  <Button
                    className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Recuperar contraseña
                  </Button>
                </form>
              </>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
