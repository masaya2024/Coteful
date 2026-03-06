<template>
  <div class="page-shell text-black">
    <AppSidebar />
    <main class="min-w-0 lg:pl-[320px]">
      <div class="px-4 py-4 md:px-6 md:py-6 lg:h-screen lg:overflow-y-auto lg:px-8 lg:py-8">
        <div class="mb-3 flex justify-end md:mb-4">
          <LocaleDock mode="menu" />
        </div>
        <div class="soft-panel min-h-[calc(100vh-8rem)] px-5 py-5 md:px-8 md:py-8 lg:min-h-[calc(100vh-4rem)]">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>
