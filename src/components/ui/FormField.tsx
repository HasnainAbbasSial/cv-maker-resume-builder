import React from 'react';
import { clsx } from 'clsx';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    textarea?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, textarea, className, ...props }) => {
    return (
        <div className={clsx("mb-4", className)}>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                {label}
            </label>
            {textarea ? (
                <textarea
                    className="w-full min-h-[100px] resize-y"
                    {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                />
            ) : (
                <input
                    className="w-full"
                    {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
                />
            )}
        </div>
    );
};

export default FormField;
