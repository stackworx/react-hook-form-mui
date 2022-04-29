import * as React from "react";

export interface ErrorContextType {
  required(): void;
}

export const ErrorContext = React.createContext<ErrorContextType>({
  required() {
    return "is required";
  },
});
