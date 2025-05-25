export default function DisabledButton({ label }: { label: string }) {
    return (
        <button
            type="button"
            className="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled
        >
            {label}
        </button>
    )
}
