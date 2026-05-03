import { RegistrationPage } from "@/components/registration/registration-page"

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const { type } = await searchParams

  return <RegistrationPage initialType={type} />
}
