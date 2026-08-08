import Swal from 'sweetalert2';

/* ---------------------------------------------------------------------------
   SweetAlert wrappers.

   SweetAlert's default palette is its own blue, which would sit outside the
   design system. These wrappers bind it to the site's theme tokens and
   typography, and expose only the shapes we actually use so dialogs stay
   consistent wherever they are raised.
--------------------------------------------------------------------------- */

const themed = Swal.mixin({
    buttonsStyling: false,
    customClass: {
        popup: 'rounded-none border border-base-300 bg-base-100 text-base-content',
        title: 'font-display text-2xl font-semibold text-base-content',
        htmlContainer: 'text-sm text-base-content/65',
        confirmButton: 'btn-shop mx-1.5',
        cancelButton: 'btn-shop-outline mx-1.5',
        denyButton: 'btn-shop-outline mx-1.5',
    },
});

// Destructive actions get a confirm dialog. Returns true only when the user
// explicitly confirms — dismissing counts as "no".
export const confirmAction = async ({
    title,
    text,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    danger = false,
}) => {
    const result = await themed.fire({
        title,
        text,
        icon: danger ? 'warning' : 'question',
        iconColor: danger ? 'var(--color-error)' : 'var(--color-primary)',
        showCancelButton: true,
        confirmButtonText: confirmLabel,
        cancelButtonText: cancelLabel,
        reverseButtons: true,
        focusCancel: danger,
    });

    return result.isConfirmed === true;
};

export const alertSuccess = (title, text) =>
    themed.fire({
        title,
        text,
        icon: 'success',
        iconColor: 'var(--color-success)',
        confirmButtonText: 'Done',
    });

export const alertError = (title, text) =>
    themed.fire({
        title,
        text,
        icon: 'error',
        iconColor: 'var(--color-error)',
        confirmButtonText: 'Close',
    });

// Brief corner confirmation for low-stakes actions, so routine feedback does
// not interrupt with a modal.
export const toastSuccess = (title) =>
    Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        iconColor: 'var(--color-success)',
        title,
        showConfirmButton: false,
        timer: 2600,
        timerProgressBar: true,
        customClass: {
            popup: 'rounded-none border border-base-300 bg-base-100',
            title: 'text-sm text-base-content',
        },
    });
