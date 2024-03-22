import * as SQLite from 'expo-sqlite/next';
import { DATABASE } from '../constants/constants';

// TODO: Index frequently queried columns
// TODO: Monitor/profile database queries
// TODO: Use prepared statements or parameterized queries to prevent SQL injection
// TODO: Look into db.execAsync(queries, readOnly) for batch operations
// TODO: Look into onDatabaseChange(cb) for listening to db changes and updating UI (e.g for only updating the UI when db changes)

let db;

export const setupDB = async () => {
  db = await getDBConnection();
  await createTables();
};

export const getDBConnection = () => {
  if (db) {
    // Reuse already existing connection
    return db;
  }

  // Upon app startup, create db connection and ensure necessary tables exist
  db = SQLite.openDatabaseAsync(DATABASE.NAME);
  return db;
};

const formatResponse = (
  resultSet,
  message = null,
  statusCode = 200,
  error = null
) => {
  const response = {};
  response.status = error ? 'error' : 'success';
  response.data = error ? null : resultSet.rows._array;
  response.message = error ? error.message : message;
  response.statusCode = statusCode;
  return response;
};

export const resetDB = async () => {
  await dropTables();
  await createTables();
};

export const getDream = async (id) => {
  return await db.getFirstAsync(`SELECT * FROM dreams WHERE id = ${id}`);
};

export const getDreamsPaginated = async (page, pageSize, searchText) => {
  let sanitizedPage = Math.max(1, page);
  let sanitizedPageSize = Math.max(1, pageSize);

  const offset = (sanitizedPage - 1) * sanitizedPageSize;

  if (searchText) {
    return await db.getAllAsync(
      `
        SELECT d.*, GROUP_CONCAT(t.name) as tags 
        FROM dreams d 
        LEFT JOIN dream_tags dt on d.id = dt.dream_id
        LEFT JOIN tags t ON dt.tag_id = t.id
        WHERE d.title LIKE \'%${searchText}%\' OR d.content LIKE \'%${searchText}%\' OR t.name LIKE \'%${searchText}%\'
        GROUP BY d.id, d.title, d.content, d.date, d.imagePaths, d.clarity, d.notes, d.favorite
        ORDER BY d.date DESC 
        LIMIT ${sanitizedPageSize}
        OFFSET ${offset}`
    );
  } else {
    return await db.getAllAsync(
      `
        SELECT d.*, GROUP_CONCAT(t.name) as tags
        FROM dreams d
        LEFT JOIN dream_tags dt on d.id = dt.dream_id 
        LEFT JOIN tags t ON dt.tag_id = t.id 
        GROUP BY d.id, d.title, d.content, d.date, d.imagePaths, d.clarity, d.notes, d.favorite
        ORDER BY d.date DESC 
        LIMIT ${sanitizedPageSize} 
        OFFSET ${offset}`
    );
  }
};

export const getAllDreams = async () => {
  return await db.execAsync('SELECT * FROM dreams ORDER BY date DESC');
};

export const createDream = async (
  title,
  content,
  date,
  imagePaths,
  clarity,
  notes
) => {
  const dream = await db.runAsync(
    `INSERT INTO dreams (title, content, date, imagePaths, clarity, notes) VALUES (\'${title}\', \'${content}\', \'${date}\', \'${imagePaths}\', ${clarity}, \'${notes}\')`
  );
  return dream;
};

export const updateDream = async (id, title, content, date) => {
  return await db.runAsync(
    `UPDATE dreams SET title = \'${title}\', content = \'${content}\', date = \'${date}\' WHERE id = ${id}`
  );
};

export const deleteDream = async (id) => {
  return await db.runAsync(`DELETE FROM dreams WHERE id = ${id}`);
};

export const checkIfTagsExist = async (tags) => {
  if (tags && tags.length > 0) {
    const tagsToCheck = tags.map((tag) => `'${tag}'`).join(', ');
    return await db.getAllAsync(
      `SELECT id, name FROM tags WHERE name IN (${tagsToCheck})`
    );
  }
};

export const getTags = async () => {
  return db.getAllAsync('SELECT * FROM tags');
};

export const createTags = async (tags) => {
  let tagsToCreate = '';

  const existingTags = await checkIfTagsExist(tags);
  const existingTagNames = existingTags.map((tag) => tag.name);

  if (existingTags && existingTags.length > 0) {
    tagsToCreate = tags.filter((tag) => !existingTagNames.includes(tag));
  } else {
    tagsToCreate = tags;
  }

  if (tagsToCreate.length > 0) {
    const tagCreationSQLParams = tagsToCreate
      .map((tag) => `('${tag}')`)
      .join(', ');

    return await db.runAsync(
      `INSERT INTO tags (name) VALUES ${tagCreationSQLParams}`
    );
  }
};

export const createDreamTags = async (dreamId, tagIds) => {
  const values = tagIds.map((tagId) => `(${dreamId}, \"${tagId}\")`).join(',');
  return await db.runAsync(
    `INSERT INTO dream_tags (dream_id, tag_id) VALUES ${values};`
  );
};

export const createTables = async () => {
  return await db.execAsync(`
    PRAGMA journal_model=WAL;
    CREATE TABLE IF NOT EXISTS dreams (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, date TEXT,imagePaths TEXT, clarity INTEGER, notes TEXT, favorite BOOLEAN);CREATE INDEX IF NOT EXISTS idx_date ON dreams(date);CREATE INDEX IF NOT EXISTS idx_title ON dreams(title);
    CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS dream_tags (dream_id INTEGER, tag_id INTEGER, PRIMARY KEY (dream_id, tag_id), FOREIGN KEY (dream_id) REFERENCES dreams (id) ON DELETE CASCADE, FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE);`);
};

export const dropTables = async () => {
  return await db.execAsync(`
    DROP TABLE IF EXISTS dreams;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS dream_tags;`);
};

export const getTableDetails = async (tableName) => {
  if (!tableName || tableName.trim() === '') {
    return await db.getAllAsync(
      `SELECT name FROM sqlite_master WHERE type="table"`
    );
  }
  return await db.getAllAsync(`PRAGMA table_info(${tableName.trim()})`);
};

setupDB();
