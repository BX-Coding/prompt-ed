interface Props {
    code: string;
}

const Code: React.FC<Props> = ({ code }) => {
    return (
        <div className="border rounded-xl p-2 my-2 bg-[rgba(0,0,0,0.05)]">
            <code>{code}</code>
        </div>
    );
};

export default Code;
