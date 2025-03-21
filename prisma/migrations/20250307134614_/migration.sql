-- CreateTable
CREATE TABLE "Hackathons" (
    "id" TEXT NOT NULL,
    "hackathon_link" TEXT NOT NULL,
    "hackathon_name" TEXT NOT NULL,
    "website_link" TEXT NOT NULL,
    "social" TEXT,
    "theme" TEXT NOT NULL,
    "participants" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "long" DOUBLE PRECISION,

    CONSTRAINT "Hackathons_pkey" PRIMARY KEY ("id")
);
