-- CreateTable
CREATE TABLE "site_visits" (
    "id" SERIAL NOT NULL,
    "path" VARCHAR(255),
    "user_agent" TEXT,
    "ip_address" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "site_visits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "site_visits_created_at_idx" ON "site_visits"("created_at");
