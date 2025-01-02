interface PlaceholderTabProps {
  message: string;
}

export const PlaceholderTab = ({ message }: PlaceholderTabProps) => {
  return (
    <div className="text-center text-muted-foreground py-8">
      {message}
    </div>
  );
};