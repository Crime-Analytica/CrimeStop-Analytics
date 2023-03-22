-- CreateTable
CREATE TABLE "Civilian" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT NOT NULL DEFAULT 'civilian',

    CONSTRAINT "Civilian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Criminal" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "wantedFor" TEXT[],
    "imageUrl" TEXT[],

    CONSTRAINT "Criminal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Police" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "badgeNumber" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'police-admin',
    "department" TEXT NOT NULL,

    CONSTRAINT "Police_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MissingPerson" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "lastSeen" TEXT NOT NULL,
    "dateMissing" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "civilianId" TEXT NOT NULL,

    CONSTRAINT "MissingPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DistressSignal" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "message" TEXT NOT NULL,
    "civilianId" TEXT NOT NULL,

    CONSTRAINT "DistressSignal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "reportType" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "civilianId" TEXT NOT NULL,
    "policeId" TEXT,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forum" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Forum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "forumId" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ForumUser" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Civilian_username_key" ON "Civilian"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Civilian_email_key" ON "Civilian"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Police_email_key" ON "Police"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ForumUser_AB_unique" ON "_ForumUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ForumUser_B_index" ON "_ForumUser"("B");

-- AddForeignKey
ALTER TABLE "MissingPerson" ADD CONSTRAINT "MissingPerson_civilianId_fkey" FOREIGN KEY ("civilianId") REFERENCES "Civilian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistressSignal" ADD CONSTRAINT "DistressSignal_civilianId_fkey" FOREIGN KEY ("civilianId") REFERENCES "Civilian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_civilianId_fkey" FOREIGN KEY ("civilianId") REFERENCES "Civilian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_policeId_fkey" FOREIGN KEY ("policeId") REFERENCES "Police"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Police"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Civilian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ForumUser" ADD CONSTRAINT "_ForumUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Civilian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ForumUser" ADD CONSTRAINT "_ForumUser_B_fkey" FOREIGN KEY ("B") REFERENCES "Forum"("id") ON DELETE CASCADE ON UPDATE CASCADE;
