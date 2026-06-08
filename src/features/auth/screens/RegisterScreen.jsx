
import {
    View,
    Text,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ScrollView
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { COLORS, SPACING, FONT_SIZE } from "../../../shared/constants/theme";
import Button from "../../../shared/components/common/Button";
import Input from "../../../shared/components/common/Input";
import kinalSportsLogo from "../../../../assets/kinal_sports.png";
import { useAuth } from "../hooks/useAuth.js";

const RegisterScreen = ({ navigation }) => {
    const { handleRegister, loading } = useAuth();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            surname: "",
            username: "",
            phone: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            await handleRegister(data);

            Alert.alert("Éxito", "Registro exitoso, ahora puedes iniciar sesión", [{text: "OK", onPress: () => navigation.navigate("Login")}]);
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || "Error al registrarse";
            Alert.alert("Error", message);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Image source={kinalSportsLogo} style={styles.logo} resizeMode="contain" />
                    <Text style={styles.subtitle}>Bienvenido a Register</Text>
                </View>

                <View style={styles.form}>
                    <Controller
                        control={control}
                        rules={{ required: "El nombre es requerido" }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Nombre"
                                placeholder="Ingresa tu nombre"
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="none"
                                error={errors.name?.message}
                            />
                        )}
                        name="name"
                    />

                    <Controller
                        control={control}
                        rules={{ required: "El Apellido es requerido" }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Apellido"
                                placeholder="Ingresa tu apellido"
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="none"
                                error={errors.surname?.message}
                            />
                        )}
                        name="surname"
                    />

                    <Controller
                        control={control}
                        rules={{ required: "El Usuario es requerido" }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Usuario"
                                placeholder="Ingresa tu usuario"
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="none"
                                error={errors.username?.message}
                            />
                        )}
                        name="username"
                    />

                    <Controller
                        control={control}
                        rules={{ 
                            required: "El Telefono es requerido", 
                            pattern: {
                                value: /^\d{8}$/,
                                message: "El telefono debe tener 8 dígitos"
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Telefono"
                                placeholder="Ingresa tu telefono ej:12345678"
                                keyboardType="numeric"
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="none"
                                error={errors.phone?.message}
                            />
                        )}
                        name="phone"
                    />

                    <Controller
                        control={control}
                        rules={{
                            required: "El correo es requerido", 
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "El correo no es válido"
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Correo"
                                placeholder="Ingresa tu correo"
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="none"
                                error={errors.email?.message}
                            />
                        )}
                        name="email"
                    />

                    <Controller
                        control={control}
                        rules={{ required: "La contraseña es requerida" }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Contraseña"
                                placeholder="Ingresa tu contraseña"
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                                error={errors.password?.message}
                            />
                        )}
                        name="password"
                    />

                    <Button title="Registrarse" onPress={handleSubmit(onSubmit)} style={styles.button} />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
                        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>Inicia sesión</Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        flexGrow: 1,
        padding: SPACING.xl,
        paddingVertical: SPACING.xxl,
    },
    header: {
        alignItems: "center",
        marginBottom: SPACING.xl,
        marginTop: SPACING.lg,
    },
    logo: {
        height: 60,
        width: 180,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontSize: FONT_SIZE.md,
        color: COLORS.secondary,
        marginTop: SPACING.sm,
    },
    form: {
        width: "100%",
    },
    button: {
        marginTop: SPACING.lg,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: SPACING.xl,
        paddingBottom: SPACING.xxl,
    },
    footerText: {
        fontSize: FONT_SIZE.md,
        color: COLORS.textLight,
    },
    link: {
        fontSize: FONT_SIZE.md,
        color: COLORS.primary,
        fontWeight: "700",
    },
});

export default RegisterScreen;