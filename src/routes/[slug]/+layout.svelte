<script lang="ts">
  import { page } from "$app/state";
  import DesktopNavigation from "$lib/components/DesktopNavigation.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import MobileNavigation from "$lib/components/MobileNavigation.svelte";
  import NavigationDialog from "$lib/components/NavigationDialog.svelte";
  import { APIRoutes, mediaQuery } from "$lib/constants.js";
  import { gg, loadGuildConfig, loadGuildData } from "$lib/stores/guild.svelte";
  import { site } from "$lib/stores/site.svelte.js";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  let { children, data } = $props();

  let innerWidth = $state(800);

  onMount(async function () {
    if (!gg.guild || page.params.slug !== gg.guild.id) {
      await loadGuildData(page.params.slug);
    }

    if (!site.news) {
      const res = await fetch(APIRoutes.news(), {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        site.news = (await res.json()) as any[];
      }
    }

    if (!gg.config) {
      await loadGuildConfig(page.params.slug);
    }
  });
</script>

<svelte:window bind:innerWidth />

<div class="flex min-h-screen w-full flex-row">
  {#if innerWidth >= mediaQuery.md}
    <DesktopNavigation />
  {/if}

  <div class="w-full">
    <div class="flex min-h-screen flex-col p-3 text-wrap" transition:slide={{ duration: 250, axis: "x" }}>
      {@render children()}
    </div>
    <Footer year={data.ccDate} />
  </div>
</div>

{#if innerWidth < mediaQuery.md}
  <MobileNavigation />
{/if}

<NavigationDialog />
