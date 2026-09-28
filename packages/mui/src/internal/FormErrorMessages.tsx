import {createContext, use} from 'react';
import type {ReactNode} from 'react';

/** Error text per RHF error type, used when a rule has no message of its own. */
export type FormErrorMessages = Partial<Record<string, string>>;

const defaultMessages: FormErrorMessages = {
  required: 'Required',
  min: 'Value is too small',
  max: 'Value is too large',
  minLength: 'Too short',
  maxLength: 'Too long',
  pattern: 'Invalid format',
  validate: 'Invalid value',
};

const MessagesContext = createContext<FormErrorMessages>(defaultMessages);

export function FormErrorMessagesProvider({
  messages,
  children,
}: {
  messages: FormErrorMessages;
  children: ReactNode;
}) {
  return (
    <MessagesContext value={{...defaultMessages, ...messages}}>
      {children}
    </MessagesContext>
  );
}

export function useFormErrorMessages(): FormErrorMessages {
  return use(MessagesContext);
}
