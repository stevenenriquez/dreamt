const CREATE_SCHEMA = `
    CREATE TABLE IF NOT EXISTS dreams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        date TEXT
    );

    CREATE TABLE IF NOT EXISTS dream_tags (
        dream_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (dream_id, tag_id),
        FOREIGN KEY (dream_id) REFERENCES dreams (id),
        FOREIGN KEY (tag_id) REFERENCES tags (id)
    );

    CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    );
`;

export { CREATE_SCHEMA };