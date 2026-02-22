type Props = {
    content: string;
  };
  
  export default function PostContentSection({ content }: Props) {
    return (
      <section>
        <div className="whitespace-pre-wrap text-[#333] leading-7">{content}</div>
      </section>
    );
  }
  