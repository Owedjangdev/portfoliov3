// Enrobe un contrôleur async pour transmettre les erreurs au middleware d'erreur.
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)
