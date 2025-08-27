"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

import { AlertTriangle, RefreshCw } from "lucide-react";

import Button from "./ui/Button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service here
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-100 p-4">
          <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-lg">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              Oops! Algo deu errado.
            </h1>
            <p className="text-slate-600 mb-6">
              Nossa equipe foi notificada. Por favor, tente recarregar a página.
            </p>
            <Button onClick={this.handleReload} variant="secondary">
              <RefreshCw className="w-4 h-4 mr-2" />
              Recarregar Página
            </Button>
            {process.env.NODE_ENV === "development" && (
              <details className="mt-6 text-left bg-slate-50 p-3 rounded text-xs text-slate-500">
                <summary className="cursor-pointer font-medium">
                  Detalhes do Erro
                </summary>
                <pre className="mt-2 whitespace-pre-wrap break-all">
                  {this.state.error?.toString()}
                  <br />
                  {this.state.error?.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
