import FallBackUI from '@/screens/errors/fallback.screen';
import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
  constructor(props: PropsWithChildren<ErrorBoundaryProps>) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || <FallBackUI error={this.state.error ? this.state.error : ''} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
