export interface ConfirmationOptions {
    title: string,
    message : string,
    confirmText : string,
    cancelText : string,
    onConfirm : () => void | Promise<void>,
    onCancel : () => void
}