import { RouterOutputs } from "~/utils/api";

type IndividualPost = RouterOutputs["posts"]["getAll"][number];

const UserPost = (props: IndividualPost) => {
    const { post, author } = props;

    return (
        <div key={post.id}>
            {post.content}
            {author.username}
            {author.profileImageUrl}
        </div>
    )
}

export default UserPost;