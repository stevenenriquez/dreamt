const retrieveTagsByDream = `
    SELECT tags.name
    FROM tags
    JOIN dream_tags ON tags.id = dream_tags.tag_id
    JOIN dreams ON dream_tags.dream_id = dreams.id
    WHERE dreams.id = ?;
`;

export { retrieveTagsByDream }