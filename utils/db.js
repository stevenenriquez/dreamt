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
            (txObj, error) => reject(error));
        });
    });
}

export const getDream = id => {
    return executeSql('SELECT * FROM dreams WHERE id = ?', [id]);
}

export const getAllDreams = () => {
    return executeSql('SELECT * FROM dreams');
}

export const createDreamTable = () => {
    return executeSql('CREATE TABLE IF NOT EXISTS dreams (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, date TEXT);');
}

export const createDream = (title, content) => {
    return executeSql('INSERT INTO dreams (title, content) VALUES (?, ?)', [title, content]);
}

export const deleteDream = id => {
    return executeSql('DELETE FROM dreams WHERE id = ?', [id]);
}