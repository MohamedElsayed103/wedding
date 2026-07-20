import { Mohamed, type OutfitPalette as MohamedPalette, type SkinTone as MohamedSkinTone } from "@/components/characters/Mohamed";
import { Mariam, type OutfitPalette as MariamPalette, type SkinTone as MariamSkinTone } from "@/components/characters/Mariam";

const SKIN_TONES: MohamedSkinTone[] = ["fair", "medium", "tan"];
const GROOM_PALETTES: MohamedPalette[] = ["espresso", "olive", "navy"];
const BRIDE_PALETTES: MariamPalette[] = ["champagne", "rose", "sage"];

/**
 * The "cast library" from BUSINESS_PLAN.md §4 Phase B — every combination
 * that exists today, browsable as a reference sheet. As more hair/beard/
 * hijab art is commissioned, add it to the character components and it
 * appears here automatically (no admin changes needed).
 */
export default function CharactersPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-800">Characters — cast library</h1>
      <p className="mt-1 max-w-2xl text-sm text-neutral-500">
        Every skin tone × outfit-palette combination available today. These are color
        variations on the same artwork — no new illustration required. Adding new hair,
        beard, or hijab <em>styles</em> (new artwork, not just color) is Phase B of the
        productization plan.
      </p>

      <h2 className="mt-8 text-sm font-semibold text-neutral-700">Groom — Mohamed</h2>
      <div className="mt-3 grid grid-cols-3 gap-4 sm:grid-cols-3">
        {SKIN_TONES.map((tone) =>
          GROOM_PALETTES.map((palette) => (
            <div key={`${tone}-${palette}`} className="rounded-lg border border-neutral-200 bg-gradient-to-b from-[#f6efe2] to-[#e8dcc6] p-4">
              <div className="flex h-48 items-end justify-center">
                <Mohamed skinTone={tone} outfitPalette={palette} animate={false} className="h-full" />
              </div>
              <p className="mt-2 text-center text-xs text-neutral-500">
                {tone} · {palette}
              </p>
            </div>
          ))
        )}
      </div>

      <h3 className="mt-6 text-xs font-semibold uppercase tracking-wide text-neutral-500">Beard on/off</h3>
      <div className="mt-3 grid grid-cols-2 gap-4 sm:w-1/2">
        {(["short", "none"] as const).map((beard) => (
          <div key={beard} className="rounded-lg border border-neutral-200 bg-gradient-to-b from-[#f6efe2] to-[#e8dcc6] p-4">
            <div className="flex h-48 items-end justify-center">
              <Mohamed beardStyle={beard} animate={false} className="h-full" />
            </div>
            <p className="mt-2 text-center text-xs text-neutral-500">{beard === "short" ? "short, groomed" : "clean-shaven"}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-semibold text-neutral-700">Bride — Mariam</h2>
      <div className="mt-3 grid grid-cols-3 gap-4 sm:grid-cols-3">
        {SKIN_TONES.map((tone) =>
          BRIDE_PALETTES.map((palette) => (
            <div key={`${tone}-${palette}`} className="rounded-lg border border-neutral-200 bg-gradient-to-b from-[#f6efe2] to-[#e8dcc6] p-4">
              <div className="flex h-48 items-end justify-center">
                <Mariam skinTone={tone as MariamSkinTone} outfitPalette={palette} animate={false} className="h-full" />
              </div>
              <p className="mt-2 text-center text-xs text-neutral-500">
                {tone} · {palette}
              </p>
            </div>
          ))
        )}
      </div>

      <h2 className="mt-10 text-sm font-semibold text-neutral-700">Ceremony attire (finale scene, fixed)</h2>
      <div className="mt-3 grid grid-cols-2 gap-4 sm:w-1/2">
        <div className="rounded-lg border border-neutral-200 bg-gradient-to-b from-[#3f3d54] to-[#6a5b5a] p-4">
          <div className="flex h-48 items-end justify-center">
            <Mohamed attire="ceremony" animate={false} className="h-full" />
          </div>
          <p className="mt-2 text-center text-xs text-neutral-300">black tuxedo</p>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-gradient-to-b from-[#3f3d54] to-[#6a5b5a] p-4">
          <div className="flex h-48 items-end justify-center">
            <Mariam attire="ceremony" animate={false} className="h-full" />
          </div>
          <p className="mt-2 text-center text-xs text-neutral-300">white bridal gown</p>
        </div>
      </div>
    </div>
  );
}
