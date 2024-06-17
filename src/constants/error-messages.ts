export const ERROR_NAMES: Record<string, string> = {
    INVALID_CREDENTIALS: 'auth-invalid-credentials',
    ALREADY_EXISTS: 'auth-already-exists',
    UNKNOWN_ERROR: 'unknown-error',
}

export const ERROR_MESSAGES: Record<string, string> = {
    'auth-invalid-credentials': 'Неверная почта или пароль.',
    'auth-already-exists': 'Пользователь с такми именем или почтой уже зарегистрирован.',
    'unknown-error': 'Произошла непредвиденная ошибка.'
}