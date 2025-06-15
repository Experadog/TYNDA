export function prepareErrorForServer(error: Error, errorInfo: React.ErrorInfo) {
	return {
		message: error.message || '',
		stack: error.stack || '',
		componentStack: errorInfo.componentStack || '',
	};
}
