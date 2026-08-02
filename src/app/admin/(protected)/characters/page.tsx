import { Avatar } from "@/components/characters/avatar/Avatar";
import {
  GROOM_DEFAULT_LOOK,
  BRIDE_DEFAULT_LOOK,
  OPTIONS,
  type AvatarLook,
} from "@/components/characters/avatar/types";

/** A browsable gallery of every part option, rendered live on the real Avatar. */
function Row({
  title,
  role,
  base,
  dimension,
  values,
}: {
  title: string;
  role: "groom" | "bride";
  base: AvatarLook;
  dimension: keyof AvatarLook;
  values: readonly string[];
}) {
  return (
    <div className="mt-8">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {values.map((v) => (
          <div key={v} className="w-32 rounded-lg border border-neutral-200 bg-gradient-to-b from-[#f6efe2] to-[#e8dcc6] p-2">
            <div className="flex h-40 items-end justify-center">
              <Avatar config={{ ...base, [dimension]: v, role, attire: "signature" }} animate={false} className="h-40" />
            </div>
            <p className="mt-1 text-center text-[0.7rem] text-neutral-500">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CharactersPage() {
  // For hijab/bride-hair rows, force the relevant mode so the change is visible.
  const brideHairBase: AvatarLook = { ...BRIDE_DEFAULT_LOOK, hijab: "none", hair: "longWavy" };

  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-800">Characters — cast library</h1>
      <p className="mt-1 max-w-2xl text-sm text-neutral-500">
        Every part option, live on the real avatar. Combine any of these per couple in the site
        editor. Skin tones, hair &amp; colours, beards, hijab drapes, faces, eyes, brows, mouths,
        glasses — plus free-flowing hair for the bride.
      </p>

      <h2 className="mt-10 text-sm font-semibold text-neutral-700">Groom — Mohamed</h2>
      <Row title="Skin tone" role="groom" base={GROOM_DEFAULT_LOOK} dimension="skinTone" values={OPTIONS.skinTone} />
      <Row title="Hair" role="groom" base={GROOM_DEFAULT_LOOK} dimension="hair" values={OPTIONS.groomHair} />
      <Row title="Hair colour" role="groom" base={GROOM_DEFAULT_LOOK} dimension="hairColor" values={OPTIONS.hairColor} />
      <Row title="Beard" role="groom" base={GROOM_DEFAULT_LOOK} dimension="beard" values={OPTIONS.beard} />
      <Row title="Face shape" role="groom" base={GROOM_DEFAULT_LOOK} dimension="faceShape" values={OPTIONS.faceShape} />
      <Row title="Eyes" role="groom" base={GROOM_DEFAULT_LOOK} dimension="eyes" values={OPTIONS.eyes} />
      <Row title="Brows" role="groom" base={GROOM_DEFAULT_LOOK} dimension="brows" values={OPTIONS.brows} />
      <Row title="Mouth" role="groom" base={GROOM_DEFAULT_LOOK} dimension="mouth" values={OPTIONS.mouth} />
      <Row title="Glasses" role="groom" base={GROOM_DEFAULT_LOOK} dimension="glasses" values={OPTIONS.glasses} />
      <Row title="Suit" role="groom" base={GROOM_DEFAULT_LOOK} dimension="outfit" values={OPTIONS.groomOutfit} />

      <h2 className="mt-12 text-sm font-semibold text-neutral-700">Bride — Mariam</h2>
      <Row title="Skin tone" role="bride" base={BRIDE_DEFAULT_LOOK} dimension="skinTone" values={OPTIONS.skinTone} />
      <Row title="Hijab drape" role="bride" base={BRIDE_DEFAULT_LOOK} dimension="hijab" values={OPTIONS.hijab} />
      <Row title="Hair (when no hijab)" role="bride" base={brideHairBase} dimension="hair" values={OPTIONS.brideHair} />
      <Row title="Hair colour" role="bride" base={brideHairBase} dimension="hairColor" values={OPTIONS.hairColor} />
      <Row title="Dress" role="bride" base={BRIDE_DEFAULT_LOOK} dimension="outfit" values={OPTIONS.brideOutfit} />

      <h2 className="mt-12 text-sm font-semibold text-neutral-700">Ceremony attire (finale)</h2>
      <div className="mt-3 flex gap-3">
        <div className="w-40 rounded-lg border border-neutral-200 bg-gradient-to-b from-[#3f3d54] to-[#6a5b5a] p-3">
          <div className="flex h-44 items-end justify-center">
            <Avatar config={{ ...GROOM_DEFAULT_LOOK, role: "groom", attire: "ceremony" }} animate={false} className="h-44" />
          </div>
          <p className="mt-1 text-center text-[0.7rem] text-neutral-300">black tuxedo</p>
        </div>
        <div className="w-40 rounded-lg border border-neutral-200 bg-gradient-to-b from-[#3f3d54] to-[#6a5b5a] p-3">
          <div className="flex h-44 items-end justify-center">
            <Avatar config={{ ...BRIDE_DEFAULT_LOOK, role: "bride", attire: "ceremony" }} animate={false} className="h-44" />
          </div>
          <p className="mt-1 text-center text-[0.7rem] text-neutral-300">white gown</p>
        </div>
      </div>
    </div>
  );
}
