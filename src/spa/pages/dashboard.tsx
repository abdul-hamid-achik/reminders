import { Card, Title } from "@tremor/react";

export default function Dashboard() {
  return (
    <main className="-mt-24 pb-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Title className="text-white">Dashboard</Title>
        <Card></Card>
      </div>
    </main>
  );
}
