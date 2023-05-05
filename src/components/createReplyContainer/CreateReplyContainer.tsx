import CreateReply from "../createReply/CreateReply";


interface CreateReplyContainerProps {
  isExpanded: boolean;
  parentPostId: string;

  onNewPostCreated: () => void;
}


const CreateReplyContainer: React.FC<CreateReplyContainerProps> = ({
  isExpanded,
  parentPostId,
  onNewPostCreated,
}) => {
  return (
    <>
      <div className="flex-grow">
        {isExpanded && (
          <CreateReply
            onNewPostCreated={(isCreated: boolean) => {
              console.log("New post created:", isCreated);
              onNewPostCreated();
            }}
            parentPostId={parentPostId}
          />
        )}
      </div>
    </>
  );
};

export default CreateReplyContainer;
