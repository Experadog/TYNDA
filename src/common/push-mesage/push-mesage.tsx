import { enqueueSnackbar } from 'notistack';

interface PushMessageProps<D extends Record<number, string>> {
    code: number;
    messages: D;
}

export const pushMessage = <D extends Record<number, string>>({
    code,
    messages,
}: PushMessageProps<D>) => {
    const text = messages[code] || `Неизвестный код: ${code}`;
    const isSuccess = Number(code) >= 200 && Number(code) < 300;

    enqueueSnackbar(text, {
        variant: isSuccess ? 'success' : 'error',
        preventDuplicate: true,
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        },
        content: (key) => (
            <div
                key={key}
                style={{
                    backgroundColor: '#f5f5f5',
                    border: isSuccess ? '1px solid #4caf50' : '1px solid #f44336',
                    padding: '7px 12px',
                    borderRadius: '7px',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'black',
                }}
            >
                <span
                    style={{
                        marginRight: '10px',
                    }}
                >
                    {isSuccess ? '✅' : '❌'}
                </span>
                {text}
            </div>
        ),
    });
};
