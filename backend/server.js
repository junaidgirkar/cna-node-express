const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = process.env.PORT || 8005;

app.use(express.json());
const cors = require("cors");
app.use(cors());

// ✅ Correct Database Credentials
const DB_NAME = 'cnainventory';
const DB_USER = 'jg7649';
const DB_PASSWORD = 'VWpolo@1158'; // Change this to your actual DB password
const DB_HOST = 'na-dbserver-flex-junaid.postgres.database.azure.com';

// ✅ Configure Sequelize with SSL for Azure PostgreSQL
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false, // Disable logging for cleaner output
});

// ✅ Test Database Connection
sequelize
  .authenticate()
  .then(() => console.log('✅ Database connection established successfully'))
  .catch((error) => console.error('❌ Unable to connect to the database:', error));

// ✅ Define Inventory Model
const Inventory = sequelize.define(
  'Inventory',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// ✅ Ensure Table Exists Before API Calls
sequelize
  .sync()
  .then(() => console.log('✅ Inventory table ready'))
  .catch((error) => console.error('❌ Error syncing database:', error));

// ✅ Fetch Inventory by ID
app.get('/inventory/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const inventory = await Inventory.findOne({
      attributes: ['id', 'name', 'quantity', 'date'],
      where: { id: id },
    });

    if (!inventory) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    res.json({ inventory });
  } catch (error) {
    console.error('❌ Error fetching inventory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ Add New Inventory Item
app.post('/inventory', async (req, res) => {
  try {
    const { name, quantity, date } = req.body;

    if (!name || !quantity) {
      return res.status(400).json({ error: 'Name and quantity are required' });
    }

    const newItem = await Inventory.create({
      name,
      quantity,
      date: date || new Date(),
    });

    res.status(201).json({ inventory: newItem });
  } catch (error) {
    console.error('❌ Error creating inventory item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/inventory', async (req, res) => {
  try {
    const inventoryList = await Inventory.findAll();
    res.json({ inventory: inventoryList });
  } catch (error) {
    console.error('❌ Error fetching inventory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// ✅ Start Express Server
app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
