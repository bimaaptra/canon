const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

async function main () {
  const hashedPassword = await bcrypt.hash('admin', 8)
  const admin = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      nama: 'Admin',
      username: 'admin',
      password: hashedPassword
    }
  })
  console.log(admin)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
