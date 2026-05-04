import { Alert } from 'react-native';
import { ConfirmationOptions } from './../../types/confirmation/ConfirmationOptions';

  const showConfirmation = ({
        title, 
        message,
        confirmText = 'Continue',
        cancelText = 'Cancel',
        onConfirm,
        onCancel,
    }: ConfirmationOptions) => {
        Alert.alert(title, message,
        [
                {
                    text: cancelText,
                    style: 'cancel',
                    onPress: onCancel,
                },

                {
                    text: confirmText,
                    onPress: onConfirm,
                    style: 'destructive',
                },
        ],
            { cancelable: true }

        );
    };


  export const useConfirmation = () => {

      const displayForgetPasswordConfirmation = (onConfirm: () => void , onCancel: () => void) => {
        showConfirmation({
            title: "Forget Password",
            message: 'A reset link will be sent to your registered email. Continue?',
            confirmText: 'Continue',
            cancelText: 'Cancel',
            onConfirm,
            onCancel
        });
    };

    const displayResetPasswordConfirmation = (onConfirm: () => void , onCancel: () => void) => {
        showConfirmation({
            title: "Reset Password",
            message: 'Your password will be changed. Continue?',
            confirmText: 'Continue',
            cancelText: 'Cancel',
            onConfirm,
            onCancel
        });
    };

    return {    
        displayForgetPasswordConfirmation,
        displayResetPasswordConfirmation
    };
   
  };

  
   
