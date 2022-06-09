/**
 * Post Data
 */
export default interface PostData {
    /**
     * Post title
     */
    title: string;
    /**
     * Post type
     */
    postType?: string;
    /**
     * Post content
     */
    content?: string;
    /**
     * Post status
     */
    status?: string;
    /**
     * Before save callback
     */
    beforeSave?: CallableFunction;
}
