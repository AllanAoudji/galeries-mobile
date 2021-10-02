import { Dispatch } from 'redux';
import { updateCommentsById } from '#store/comments/actionCreators';

const dispatchUpdateCommentComments = (
    dispatch: Dispatch<Store.Action>,
    comment: Store.Models.Comment,
    comments: {
        allIds?: string[];
        end?: boolean;
        previous?: string;
        status?: Store.Status;
    }
) => {
    dispatch(
        updateCommentsById({
            ...comment,
            comments: {
                allIds:
                    comments.allIds ||
                    (comment.comments ? comment.comments.allIds : []),
                end:
                    comments.end ||
                    (comment.comments ? comment.comments.end : false),
                previous:
                    comments.previous ||
                    (comment.comments ? comment.comments.previous : undefined),
                status:
                    comments.status ||
                    (comment.comments ? comment.comments.status : 'PENDING'),
            },
        })
    );
};

export default dispatchUpdateCommentComments;
