import { RouterOutputs } from "~/utils/api";
import Link from "next/link";

type IndividualPost = RouterOutputs["posts"]["getAll"][number];

const UserPost = (props: IndividualPost) => {
    const { post, author } = props;

    return (
        <div key={post.id}>
            <Link href={`/post/${post.id}`}><span>{post.content}</span></Link>
            <Link href={`/@${author.username}`}><span>@{author.username}</span></Link>
            {author.profileImageUrl}
        </div>
    )
}

export default UserPost;