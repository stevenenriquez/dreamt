import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'dreamt.db';

let db;

export const getDBConnection = () => {
    if(db) {
        // Reuse already existing connection
        return db;
    }

    // Upon app startup, create db connection and ensure necessary tables exist
    db = SQLite.openDatabase(DATABASE_NAME);
    createDreamTable();
    return db;
};

const executeSql = (sql, params = []) => {
    db = getDBConnection();
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(sql, params, (txObj, resultSet) => resolve(resultSet),
            (txObj, error) => {
                console.error('Error executing SQL: ' + error);
                reject(error);
            });
        });
    });
}

export const getDream = id => {
    return executeSql('SELECT * FROM dreams WHERE id = ?', [id]);
}

export const getDreamsPaginated = (page, pageSize, searchText) => {
  let sanitizedPage = Math.max(1, page);
  let sanitizedPageSize = Math.max(1, pageSize);

  const offset = (sanitizedPage - 1) * sanitizedPageSize;
  
  if(searchText) {
    return executeSql('SELECT * FROM dreams WHERE title LIKE ? OR content LIKE ? OR tags LIKE ? ORDER BY date DESC LIMIT ? OFFSET ?', [`%${searchText}%`, `%${searchText}%`, `%${searchText}%`, sanitizedPageSize, offset]);
  } else {
    return executeSql('SELECT * FROM dreams ORDER BY date DESC LIMIT ? OFFSET ?', [sanitizedPageSize, offset]);
  }
};

export const getAllDreams = () => {
    return executeSql('SELECT * FROM dreams ORDER BY date DESC');
}

export const createDreamTable = () => {
    return executeSql(`CREATE TABLE IF NOT EXISTS dreams (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, date TEXT,imagePaths TEXT, tags TEXT, clarity INTEGER, notes TEXT);CREATE INDEX IF NOT EXISTS idx_date ON dreams(date);CREATE INDEX IF NOT EXISTS idx_title ON dreams(title);`);
}

export const createDream = (title, content, date, imagePaths, tags, clarity, notes) => {
    return executeSql('INSERT INTO dreams (title, content, date, imagePaths, tags, clarity, notes) VALUES (?, ?, ?, ?, ?, ?, ?)', [title, content, date, imagePaths, tags, clarity, notes]);
}

export const updateDream = (id, title, content, date) => {
    return executeSql('UPDATE dreams SET title = ?, content = ?, date = ? WHERE id = ?', [title, content, date, id]);
}

export const deleteDream = id => {
    return executeSql('DELETE FROM dreams WHERE id = ?', [id]);
}

export const dropDreamTable = () => {
    return executeSql('DROP TABLE IF EXISTS dreams');
}