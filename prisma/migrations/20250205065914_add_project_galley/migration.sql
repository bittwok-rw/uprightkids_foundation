-- CreateEnum
CREATE TYPE "GalleryCategory" AS ENUM ('BLOG', 'PROJECT', 'TEAM');

-- CreateTable
CREATE TABLE "Gallery" (
    "id" TEXT NOT NULL,
    "blogId" TEXT,
    "url" TEXT NOT NULL,
    "projectId" TEXT,
    "category" "GalleryCategory" NOT NULL DEFAULT 'BLOG',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE SET NULL ON UPDATE CASCADE;
