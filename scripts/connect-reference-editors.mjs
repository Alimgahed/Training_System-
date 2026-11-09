import fs from 'node:fs';
if (!process.argv[2]) throw new Error('Provide the API documentation path as the first argument.');
const doc = fs.readFileSync(process.argv[2], 'utf8');
const entries = [...doc.matchAll(/\| `\/([a-z-]+)`, `\/([^/]+)\/:id` \| `models\.[^`]+` \| `\/new-[a-z-]+` \|/g)];
const imports = ["import { lazy } from 'react';", "import { ReferenceEditor } from '../shared/components/ReferenceEditor';"];
const routes = [];
const registry = {};
for (const [,resource,singular] of entries) {
  const file = `src/features/${resource}/components/Create.tsx`;
  if (!fs.existsSync(file)) continue;
  let source = fs.readFileSync(file, 'utf8');
  const component = source.match(/export function (\w+)/)?.[1];
  if (!component) continue;
  registry[resource] = singular;
  source = source.replace(/import \{ useForm \} from 'react-hook-form';/, "import { useReferenceForm as useForm, useReferenceMutation } from '../../../shared/components/ReferenceEditor';");
  source = source.replace(/import \{ useCreate\w+Mutation \} from '..\/api\/useCreateMutation';\n/, '');
  source = source.replace(/const mutation = useCreate\w+Mutation\(\);/, 'const mutation = useReferenceMutation<FormInputs>();');
  source = source.replace(/<h2[^>]*>إضافة [^<]+<\/h2>/, '<h2>بيانات السجل</h2>');
  source = source.replace(/<form /, '{mutation.isError && <p role="alert" className="user-feedback is-error">تعذر الحفظ. راجع البيانات والصلاحيات ثم حاول مجدداً.</p>}\n      <form ');
  fs.writeFileSync(file, source);
  imports.push(`const ${component} = lazy(() => import('../features/${resource}/components/Create').then(m => ({ default: m.${component} })));`);
  for (const suffix of ['new', ':id/edit']) routes.push(`{ path: '/${resource}/${suffix}', element: <ReferenceEditor resource="${resource}" singular="${singular}"><${component} /></ReferenceEditor> }`);
}
fs.writeFileSync('src/app/referenceRoutes.tsx', imports.join('\n') + '\nexport const referenceRoutes = [\n' + routes.join(',\n') + '\n];\nexport const referenceResources: Record<string, string> = ' + JSON.stringify(registry,null,2) + ';\n');
console.log(`Connected ${Object.keys(registry).length} existing forms for create and edit.`);
