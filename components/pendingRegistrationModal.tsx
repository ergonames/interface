interface PendingRegistrationModalProps {
    ergoname: string;
}

export default function PendingRegistrationModal({ ergoname }: PendingRegistrationModalProps) {
    return (
        <div>
            <h1>Pending Registration - { ergoname }</h1>
            <h1>Todo - finish page</h1>
        </div>
    )
}