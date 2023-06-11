import { z } from 'zod'

export const artifiact = z.object({
    id: z.string(),
    name: z.string(),
    version: z.string(),
    type: z.string(),
    foundBy: z.string(),
    locations: z.object({
        path: z.string(),
    }).array(),
    licences: z.string().array(),
    language: z.string(),
    cpes: z.string().array(),
    purl: z.string(),
})

export const artifactRelationship = z.object({})

export const source = z.object({
    type: z.string(),
    target: z.string()
})

export const distro = z.object({})

export const cataloger = z.object({
    enabled: z.boolean(),
    scope: z.string(),
})

export const descriptor = z.object({
    name: z.string(),
    version: z.string(),
    configuration: z.object({
        configPath: z.string(),
        verbosity: z.number(),
        quiet: z.boolean(),
        output: z.string().array(),
        "output-template-path": z.string(),
        file: z.string(),
        "check-for-app-update": z.boolean(),
        anchore: z.object({
            host: z.string(),
            path: z.string(),
            dockerfile: z.string(),
            "overwrite-existing-image": z.boolean(),
            "import-timeout": z.number()
        }),
        dev: z.object({
            "profile-cpu": z.boolean(),
            "profile-mem": z.boolean(),
        }),
        log: z.object({
            structured: z.boolean(),
            level: z.string(),
            "file-location": z.string(),
        }),
        catalogers: z.any().nullable(),
        package: z.object({
            cataloger: cataloger,
            "search-unindexed-archives": z.boolean(),
            "search-indexed-archives": z.boolean(),
        }),
        "file-metadata": z.object({
            cataloger: cataloger,
            digests: z.string().array()
        }),
        "file-classification": z.object({
            cataloger: cataloger,
        }),
        "file-contents": z.object({
            cataloger: cataloger,
            "skip-files-above-size": z.number(),
            globs: z.string().array(),
        }),
        secrets: z.object({
            cataloger: cataloger,
            "aditional-paterns": z.any(),
            "exclude-pattern-names": z.any().array(),
            "reveal-values": z.boolean(),
            "skip-files-above-size": z.number(),
        }),
        registry: z.object({
            "insecure-skip-tls-verify": z.boolean(),
            "insecure-use-http": z.boolean(),
            auth: z.any().array()
        }),
        exclude: z.string().array(),
        attest: z.object({
            key: z.string(),
            cert: z.string(),
            noUpload: z.boolean(),
            force: z.boolean(),
            recursive: z.boolean(),
            replace: z.boolean(),
            fulcioUrl: z.union([z.string(), z.string().url()]),
            fulcio_identity_token: z.string(),
            insecure_skip_verify: z.boolean(),
            rekorUrl: z.union([z.string(), z.string().url()]),
            oidcIssuer: z.union([z.string(), z.string().url()]),
            oidcClientId: z.string(),
            OIDCRedirectURL: z.union([z.string(), z.string().url()])
        }),
        platform: z.string()
    })
})

export const schema = z.object({
    version: z.string(),
    url: z.string().url(),
})

export const syft = z.object({
    artifacts: artifiact.array(),
    artifactRelationships: z.union([z.any().array(), artifactRelationship.array()]),
    source: source,
    distro: z.union([z.any(), distro]),
    descriptor: descriptor,
    schema: schema
})

export type TSyft = z.infer<typeof syft>
export type TSyftArtifiact = z.infer<typeof artifiact>
export type TSyftArtifactRelationship = z.infer<typeof artifactRelationship>
export type TSyftSource = z.infer<typeof source>
export type TSyftDistro = z.infer<typeof distro>
export type TSyftCataloger = z.infer<typeof cataloger>
export type TSyftDescriptor = z.infer<typeof descriptor>
export type TSyftSchema = z.infer<typeof schema>