import app from "./app";
import { sequelize } from "./config/database";
import "./models";

const PORT = Number(process.env.PORT || 4000);

const bootstrap = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error);
    process.exit(1);
  }
};

bootstrap();
