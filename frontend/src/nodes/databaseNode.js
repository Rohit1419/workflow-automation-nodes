import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const DatabaseNode = ({ id, data }) => {
  const [dbType, setDbType] = useState(data?.dbType || 'postgresql');
  const [connectionString, setConnectionString] = useState(data?.connectionString || 'postgresql://user:password@localhost:5432/mydb');
  const [query, setQuery] = useState(data?.query || 'SELECT * FROM table LIMIT 10');
  const [queryTemplate, setQueryTemplate] = useState(data?.queryTemplate || 'select');
  const queryRef = useRef(null);

  const dbTypes = [
    { value: 'postgresql', label: 'PostgreSQL', icon: '🐘' },
    { value: 'mysql', label: 'MySQL', icon: '🐬' },
    { value: 'mongodb', label: 'MongoDB', icon: '🍃' },
    { value: 'sqlite', label: 'SQLite', icon: '📦' },
    { value: 'mssql', label: 'SQL Server', icon: '🔷' },
    { value: 'dynamodb', label: 'DynamoDB', icon: '⚡' },
  ];

  // Query templates based on DB type
  const queryTemplates = {
    postgresql: {
      select: 'SELECT * FROM table LIMIT 10',
      search: 'SELECT * FROM table WHERE name ILIKE $1 OR email ILIKE $1',
      insert: 'INSERT INTO table (column1, column2) VALUES ($1, $2)',
      update: 'UPDATE table SET column1 = $1 WHERE id = $2',
      delete: 'DELETE FROM table WHERE id = $1',
      aggregate: 'SELECT COUNT(*), column1 FROM table GROUP BY column1',
    },
    mysql: {
      select: 'SELECT * FROM table LIMIT 10',
      search: 'SELECT * FROM table WHERE name LIKE ? OR email LIKE ?',
      insert: 'INSERT INTO table (column1, column2) VALUES (?, ?)',
      update: 'UPDATE table SET column1 = ? WHERE id = ?',
      delete: 'DELETE FROM table WHERE id = ?',
      aggregate: 'SELECT COUNT(*), column1 FROM table GROUP BY column1',
    },
    mongodb: {
      find: 'db.collection.find({}).limit(10)',
      search: 'db.collection.find({$or: [{name: {$regex: "search", $options: "i"}}, {email: {$regex: "search", $options: "i"}}]})',
      insert: 'db.collection.insertOne({field: "value"})',
      update: 'db.collection.updateOne({_id: ObjectId()}, {$set: {field: "value"}})',
      delete: 'db.collection.deleteOne({_id: ObjectId()})',
      aggregate: 'db.collection.aggregate([{$group: {_id: "$field", count: {$sum: 1}}}])',
    },
    sqlite: {
      select: 'SELECT * FROM table LIMIT 10',
      search: 'SELECT * FROM table WHERE name LIKE ? OR email LIKE ?',
      insert: 'INSERT INTO table (column1, column2) VALUES (?, ?)',
      update: 'UPDATE table SET column1 = ? WHERE id = ?',
      delete: 'DELETE FROM table WHERE id = ?',
      aggregate: 'SELECT column1, COUNT(*) FROM table GROUP BY column1',
    },
    mssql: {
      select: 'SELECT TOP 10 * FROM table',
      search: 'SELECT * FROM table WHERE name LIKE ? OR email LIKE ?',
      insert: 'INSERT INTO table (column1, column2) VALUES (@p1, @p2)',
      update: 'UPDATE table SET column1 = @p1 WHERE id = @p2',
      delete: 'DELETE FROM table WHERE id = @p1',
      aggregate: 'SELECT column1, COUNT(*) FROM table GROUP BY column1',
    },
    dynamodb: {
      scan: 'Scan({"TableName": "TableName", "Limit": 10})',
      search: 'Query({"TableName": "TableName", "IndexName": "GSI", "KeyConditionExpression": "email = :email"})',
      query: 'Query({"TableName": "TableName", "KeyConditionExpression": "pk = :pk"})',
      put: 'PutItem({"TableName": "TableName", "Item": {}})',
      update: 'UpdateItem({"TableName": "TableName", "Key": {}})',
      delete: 'DeleteItem({"TableName": "TableName", "Key": {}})',
    },
  };

  // Auto-resize query textarea
  useEffect(() => {
    if (queryRef.current) {
      queryRef.current.style.height = 'auto';
      queryRef.current.style.height = Math.max(80, queryRef.current.scrollHeight) + 'px';
    }
  }, [query]);

  const handleChangeDatabaseType = (newDbType) => {
    setDbType(newDbType);
    const templates = queryTemplates[newDbType];
    const firstTemplate = Object.keys(templates)[0];
    setQueryTemplate(firstTemplate);
    setQuery(templates[firstTemplate]);
  };

  const handleTemplateChange = (template) => {
    setQueryTemplate(template);
    setQuery(queryTemplates[dbType][template]);
  };

  const getConnectionStringPlaceholder = () => {
    const placeholders = {
      postgresql: 'postgresql://user:password@host:5432/database',
      mysql: 'mysql://user:password@host:3306/database',
      mongodb: 'mongodb+srv://user:password@cluster.mongodb.net/database',
      sqlite: '/path/to/database.db',
      mssql: 'Server=host;Database=database;User=user;Password=password',
      dynamodb: 'aws-region',
      firestore: 'project-id',
    };
    return placeholders[dbType] || 'connection string';
  };

  const handles = [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'output', type: 'source', position: Position.Right }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{
        label: 'Database',
        description: 'Connect and query database',
        handles: handles,
        bgColor: '#e8f5e9',
        borderColor: '#4caf50',
      }}
    >
      <div className="w-full space-y-3 text-xs">
        {/* Database Type */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Database Type
          </label>
          <select 
            value={dbType} 
            onChange={(e) => handleChangeDatabaseType(e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-800"
          >
            {dbTypes.map(db => (
              <option key={db.value} value={db.value}>{db.icon} {db.label}</option>
            ))}
          </select>
        </div>

        {/* Connection String */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Connection String
          </label>
          <input 
            type="text" 
            value={connectionString} 
            onChange={(e) => setConnectionString(e.target.value)}
            placeholder={getConnectionStringPlaceholder()}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-800 text-xs font-mono"
          />
          <p className="text-gray-500 text-xs mt-1">
            Supports local and cloud databases (MongoDB Atlas, Cloud SQL, etc.)
          </p>
        </div>

        {/* Query Templates */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Query Template
          </label>
          <select 
            value={queryTemplate} 
            onChange={(e) => handleTemplateChange(e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-800"
          >
            {Object.keys(queryTemplates[dbType]).map(template => (
              <option key={template} value={template}>
                {template === 'search'  }{template.charAt(0).toUpperCase() + template.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Query */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Query
          </label>
          <textarea 
            ref={queryRef}
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query..."
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-800 resize-none overflow-hidden font-mono text-xs"
            style={{ minHeight: '80px' }}
          />
        </div>

        {/* Info Box */}
        <div className="bg-green-50 border border-green-200 rounded-md p-2 mt-2">
          <p className="text-gray-700 text-xs leading-relaxed">
            <strong>DB:</strong> {dbTypes.find(d => d.value === dbType)?.label}
            <br />
            <strong>Template:</strong> {queryTemplate.charAt(0).toUpperCase() + queryTemplate.slice(1)}
          </p>
        </div>
      </div>
    </BaseNode>
  );
}