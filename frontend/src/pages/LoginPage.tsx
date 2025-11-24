import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography, message } from "antd";
import { useState } from "react";
import api from "../api/client";

// Assets
import logoMP from "../../assets/MP_logo.png";

const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", {
        username: values.username,
        password: values.password,
      });
      
      localStorage.setItem("token", res.data.token);
      message.success("Bienvenido al sistema");
      window.location.href = "/expedientes";
    } catch (err: any) {
      message.error(err.response?.data?.message ?? "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 1. Contenedor: Gradiente con Tailwind
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#E3EAF3] to-[#5379A6]">
      
      <div className="min-h-screen flex items-center justify-center 
  bg-gradient-to-br from-[#1B375C] via-[#234A74] to-[#295688] px-16">


      {/* 2. Tarjeta: Sombra fuerte y bordes redondeados */}
      <Card 
        bordered={false} 
        className="w-full max-w-[420px] shadow-2xl rounded-2xl overflow-hidden"
        bodyStyle={{ padding: '2.5rem 2rem' }} // Padding interno personalizado
      >
        
        {/* Header / Logo */}
        <div className="text-center mb-8">
          <img 
            src={logoMP}
            alt="Logo MP" 
            className="w-32 mx-auto mb-4 object-contain"
          />
          
          {/* Títulos con clases de Tailwind para control preciso */}
          <h2 className="text-xl font-bold text-gray-800 leading-tight mb-2">
            Dirección de Investigación Criminalística (DICRI)
          </h2>
          <p className="text-gray-500 text-sm">
            Sistema de Gestión de Evidencia
          </p>
        </div>

        {/* Formulario AntD con estilos Tailwind inyectados */}
        <Form
          name="login_form"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          className="space-y-4" // Espaciado vertical entre items
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Por favor ingresa tu usuario' }]}
            className="mb-4"
          >
            {/* Input 'Píldora': rounded-full */}
            <Input 
              prefix={<UserOutlined className="text-gray-400 text-lg mr-2" />} 
              placeholder="Usuario" 
              className="rounded-full py-2 px-4 bg-gray-50 border-gray-300 hover:border-blue-500 focus:border-blue-500"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
            className="mb-6"
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400 text-lg mr-2" />}
              placeholder="Contraseña"
              className="rounded-full py-2 px-4 bg-gray-50 border-gray-300 hover:border-blue-500 focus:border-blue-500"
            />
          </Form.Item>

          <Form.Item>
            {/* Botón: Azul específico y borde completamente redondo */}
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              loading={loading}
              className="h-12 rounded-full font-bold text-base bg-[#1d4ed8] hover:!bg-[#1e40af] border-none shadow-lg hover:shadow-xl transition-all"
            >
              Iniciar Sesión
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <Text className="text-gray-500 text-xs hover:text-blue-600 cursor-pointer transition-colors">
            Recuperar Contraseña
          </Text>
        </div>
      </Card>
      </div>
    </div>
  );
}